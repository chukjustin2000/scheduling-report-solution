package com.scheduling.report.web.rest;

import com.scheduling.report.ShedulingSolutionApp;
import com.scheduling.report.domain.Recipient;
import com.scheduling.report.repository.RecipientRepository;
import com.scheduling.report.service.RecipientService;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link RecipientResource} REST controller.
 */
@SpringBootTest(classes = ShedulingSolutionApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class RecipientResourceIT {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_EMAIL = "AAAAAAAAAA";
    private static final String UPDATED_EMAIL = "BBBBBBBBBB";

    private static final String DEFAULT_ADDRESS = "AAAAAAAAAA";
    private static final String UPDATED_ADDRESS = "BBBBBBBBBB";

    private static final String DEFAULT_PHONE = "AAAAAAAAAA";
    private static final String UPDATED_PHONE = "BBBBBBBBBB";

    @Autowired
    private RecipientRepository recipientRepository;

    @Autowired
    private RecipientService recipientService;

    @Autowired
    private MockMvc restRecipientMockMvc;

    private Recipient recipient;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Recipient createEntity() {
        Recipient recipient = new Recipient()
            .name(DEFAULT_NAME)
            .email(DEFAULT_EMAIL)
            .address(DEFAULT_ADDRESS)
            .phone(DEFAULT_PHONE);
        return recipient;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Recipient createUpdatedEntity() {
        Recipient recipient = new Recipient()
            .name(UPDATED_NAME)
            .email(UPDATED_EMAIL)
            .address(UPDATED_ADDRESS)
            .phone(UPDATED_PHONE);
        return recipient;
    }

    @BeforeEach
    public void initTest() {
        recipientRepository.deleteAll();
        recipient = createEntity();
    }

    @Test
    public void createRecipient() throws Exception {
        int databaseSizeBeforeCreate = recipientRepository.findAll().size();
        // Create the Recipient
        restRecipientMockMvc.perform(post("/api/recipients")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(recipient)))
            .andExpect(status().isCreated());

        // Validate the Recipient in the database
        List<Recipient> recipientList = recipientRepository.findAll();
        assertThat(recipientList).hasSize(databaseSizeBeforeCreate + 1);
        Recipient testRecipient = recipientList.get(recipientList.size() - 1);
        assertThat(testRecipient.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testRecipient.getEmail()).isEqualTo(DEFAULT_EMAIL);
        assertThat(testRecipient.getAddress()).isEqualTo(DEFAULT_ADDRESS);
        assertThat(testRecipient.getPhone()).isEqualTo(DEFAULT_PHONE);
    }

    @Test
    public void createRecipientWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = recipientRepository.findAll().size();

        // Create the Recipient with an existing ID
        recipient.setId("existing_id");

        // An entity with an existing ID cannot be created, so this API call must fail
        restRecipientMockMvc.perform(post("/api/recipients")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(recipient)))
            .andExpect(status().isBadRequest());

        // Validate the Recipient in the database
        List<Recipient> recipientList = recipientRepository.findAll();
        assertThat(recipientList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = recipientRepository.findAll().size();
        // set the field null
        recipient.setName(null);

        // Create the Recipient, which fails.


        restRecipientMockMvc.perform(post("/api/recipients")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(recipient)))
            .andExpect(status().isBadRequest());

        List<Recipient> recipientList = recipientRepository.findAll();
        assertThat(recipientList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    public void getAllRecipients() throws Exception {
        // Initialize the database
        recipientRepository.save(recipient);

        // Get all the recipientList
        restRecipientMockMvc.perform(get("/api/recipients?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(recipient.getId())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)))
            .andExpect(jsonPath("$.[*].email").value(hasItem(DEFAULT_EMAIL)))
            .andExpect(jsonPath("$.[*].address").value(hasItem(DEFAULT_ADDRESS)))
            .andExpect(jsonPath("$.[*].phone").value(hasItem(DEFAULT_PHONE)));
    }
    
    @Test
    public void getRecipient() throws Exception {
        // Initialize the database
        recipientRepository.save(recipient);

        // Get the recipient
        restRecipientMockMvc.perform(get("/api/recipients/{id}", recipient.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(recipient.getId()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME))
            .andExpect(jsonPath("$.email").value(DEFAULT_EMAIL))
            .andExpect(jsonPath("$.address").value(DEFAULT_ADDRESS))
            .andExpect(jsonPath("$.phone").value(DEFAULT_PHONE));
    }
    @Test
    public void getNonExistingRecipient() throws Exception {
        // Get the recipient
        restRecipientMockMvc.perform(get("/api/recipients/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    public void updateRecipient() throws Exception {
        // Initialize the database
        recipientService.save(recipient);

        int databaseSizeBeforeUpdate = recipientRepository.findAll().size();

        // Update the recipient
        Recipient updatedRecipient = recipientRepository.findById(recipient.getId()).get();
        updatedRecipient
            .name(UPDATED_NAME)
            .email(UPDATED_EMAIL)
            .address(UPDATED_ADDRESS)
            .phone(UPDATED_PHONE);

        restRecipientMockMvc.perform(put("/api/recipients")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedRecipient)))
            .andExpect(status().isOk());

        // Validate the Recipient in the database
        List<Recipient> recipientList = recipientRepository.findAll();
        assertThat(recipientList).hasSize(databaseSizeBeforeUpdate);
        Recipient testRecipient = recipientList.get(recipientList.size() - 1);
        assertThat(testRecipient.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testRecipient.getEmail()).isEqualTo(UPDATED_EMAIL);
        assertThat(testRecipient.getAddress()).isEqualTo(UPDATED_ADDRESS);
        assertThat(testRecipient.getPhone()).isEqualTo(UPDATED_PHONE);
    }

    @Test
    public void updateNonExistingRecipient() throws Exception {
        int databaseSizeBeforeUpdate = recipientRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restRecipientMockMvc.perform(put("/api/recipients")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(recipient)))
            .andExpect(status().isBadRequest());

        // Validate the Recipient in the database
        List<Recipient> recipientList = recipientRepository.findAll();
        assertThat(recipientList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    public void deleteRecipient() throws Exception {
        // Initialize the database
        recipientService.save(recipient);

        int databaseSizeBeforeDelete = recipientRepository.findAll().size();

        // Delete the recipient
        restRecipientMockMvc.perform(delete("/api/recipients/{id}", recipient.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Recipient> recipientList = recipientRepository.findAll();
        assertThat(recipientList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
