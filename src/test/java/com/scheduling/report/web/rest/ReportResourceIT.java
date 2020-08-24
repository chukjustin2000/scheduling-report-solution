package com.scheduling.report.web.rest;

import com.scheduling.report.ShedulingSolutionApp;
import com.scheduling.report.domain.Report;
import com.scheduling.report.repository.ReportRepository;
import com.scheduling.report.service.ReportService;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.util.Base64Utils;

import java.time.Instant;
import java.time.ZonedDateTime;
import java.time.ZoneOffset;
import java.time.ZoneId;
import java.util.List;

import static com.scheduling.report.web.rest.TestUtil.sameInstant;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.scheduling.report.domain.enumeration.OccurenceMode;
/**
 * Integration tests for the {@link ReportResource} REST controller.
 */
@SpringBootTest(classes = ShedulingSolutionApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class ReportResourceIT {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final OccurenceMode DEFAULT_OCCURENCE_MODE = OccurenceMode.ONEOFF;
    private static final OccurenceMode UPDATED_OCCURENCE_MODE = OccurenceMode.CANCEL;

    private static final ZonedDateTime DEFAULT_ONE_OFF_SCHEDULE = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_ONE_OFF_SCHEDULE = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    private static final ZonedDateTime DEFAULT_TIME_FROM_SCHEDULE = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_TIME_FROM_SCHEDULE = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    private static final ZonedDateTime DEFAULT_TIME_TO_SCHEDULE = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_TIME_TO_SCHEDULE = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    private static final ZonedDateTime DEFAULT_TIME_NEXT_SCHEDULE = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_TIME_NEXT_SCHEDULE = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    private static final byte[] DEFAULT_DOCUMENT = TestUtil.createByteArray(1, "0");
    private static final byte[] UPDATED_DOCUMENT = TestUtil.createByteArray(1, "1");
    private static final String DEFAULT_DOCUMENT_CONTENT_TYPE = "image/jpg";
    private static final String UPDATED_DOCUMENT_CONTENT_TYPE = "image/png";

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    @Autowired
    private ReportRepository reportRepository;

    @Autowired
    private ReportService reportService;

    @Autowired
    private MockMvc restReportMockMvc;

    private Report report;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Report createEntity() {
        Report report = new Report()
            .name(DEFAULT_NAME)
            .occurenceMode(DEFAULT_OCCURENCE_MODE)
            .oneOffSchedule(DEFAULT_ONE_OFF_SCHEDULE)
            .timeFromSchedule(DEFAULT_TIME_FROM_SCHEDULE)
            .timeToSchedule(DEFAULT_TIME_TO_SCHEDULE)
            .timeNextSchedule(DEFAULT_TIME_NEXT_SCHEDULE)
            .document(DEFAULT_DOCUMENT)
            .documentContentType(DEFAULT_DOCUMENT_CONTENT_TYPE)
            .description(DEFAULT_DESCRIPTION);
        return report;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Report createUpdatedEntity() {
        Report report = new Report()
            .name(UPDATED_NAME)
            .occurenceMode(UPDATED_OCCURENCE_MODE)
            .oneOffSchedule(UPDATED_ONE_OFF_SCHEDULE)
            .timeFromSchedule(UPDATED_TIME_FROM_SCHEDULE)
            .timeToSchedule(UPDATED_TIME_TO_SCHEDULE)
            .timeNextSchedule(UPDATED_TIME_NEXT_SCHEDULE)
            .document(UPDATED_DOCUMENT)
            .documentContentType(UPDATED_DOCUMENT_CONTENT_TYPE)
            .description(UPDATED_DESCRIPTION);
        return report;
    }

    @BeforeEach
    public void initTest() {
        reportRepository.deleteAll();
        report = createEntity();
    }

    @Test
    public void createReport() throws Exception {
        int databaseSizeBeforeCreate = reportRepository.findAll().size();
        // Create the Report
        restReportMockMvc.perform(post("/api/reports")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(report)))
            .andExpect(status().isCreated());

        // Validate the Report in the database
        List<Report> reportList = reportRepository.findAll();
        assertThat(reportList).hasSize(databaseSizeBeforeCreate + 1);
        Report testReport = reportList.get(reportList.size() - 1);
        assertThat(testReport.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testReport.getOccurenceMode()).isEqualTo(DEFAULT_OCCURENCE_MODE);
        assertThat(testReport.getOneOffSchedule()).isEqualTo(DEFAULT_ONE_OFF_SCHEDULE);
        assertThat(testReport.getTimeFromSchedule()).isEqualTo(DEFAULT_TIME_FROM_SCHEDULE);
        assertThat(testReport.getTimeToSchedule()).isEqualTo(DEFAULT_TIME_TO_SCHEDULE);
        assertThat(testReport.getTimeNextSchedule()).isEqualTo(DEFAULT_TIME_NEXT_SCHEDULE);
        assertThat(testReport.getDocument()).isEqualTo(DEFAULT_DOCUMENT);
        assertThat(testReport.getDocumentContentType()).isEqualTo(DEFAULT_DOCUMENT_CONTENT_TYPE);
        assertThat(testReport.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
    }

    @Test
    public void createReportWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = reportRepository.findAll().size();

        // Create the Report with an existing ID
        report.setId("existing_id");

        // An entity with an existing ID cannot be created, so this API call must fail
        restReportMockMvc.perform(post("/api/reports")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(report)))
            .andExpect(status().isBadRequest());

        // Validate the Report in the database
        List<Report> reportList = reportRepository.findAll();
        assertThat(reportList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = reportRepository.findAll().size();
        // set the field null
        report.setName(null);

        // Create the Report, which fails.


        restReportMockMvc.perform(post("/api/reports")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(report)))
            .andExpect(status().isBadRequest());

        List<Report> reportList = reportRepository.findAll();
        assertThat(reportList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    public void getAllReports() throws Exception {
        // Initialize the database
        reportRepository.save(report);

        // Get all the reportList
        restReportMockMvc.perform(get("/api/reports?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(report.getId())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)))
            .andExpect(jsonPath("$.[*].occurenceMode").value(hasItem(DEFAULT_OCCURENCE_MODE.toString())))
            .andExpect(jsonPath("$.[*].oneOffSchedule").value(hasItem(sameInstant(DEFAULT_ONE_OFF_SCHEDULE))))
            .andExpect(jsonPath("$.[*].timeFromSchedule").value(hasItem(sameInstant(DEFAULT_TIME_FROM_SCHEDULE))))
            .andExpect(jsonPath("$.[*].timeToSchedule").value(hasItem(sameInstant(DEFAULT_TIME_TO_SCHEDULE))))
            .andExpect(jsonPath("$.[*].timeNextSchedule").value(hasItem(sameInstant(DEFAULT_TIME_NEXT_SCHEDULE))))
            .andExpect(jsonPath("$.[*].documentContentType").value(hasItem(DEFAULT_DOCUMENT_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].document").value(hasItem(Base64Utils.encodeToString(DEFAULT_DOCUMENT))))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION)));
    }
    
    @Test
    public void getReport() throws Exception {
        // Initialize the database
        reportRepository.save(report);

        // Get the report
        restReportMockMvc.perform(get("/api/reports/{id}", report.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(report.getId()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME))
            .andExpect(jsonPath("$.occurenceMode").value(DEFAULT_OCCURENCE_MODE.toString()))
            .andExpect(jsonPath("$.oneOffSchedule").value(sameInstant(DEFAULT_ONE_OFF_SCHEDULE)))
            .andExpect(jsonPath("$.timeFromSchedule").value(sameInstant(DEFAULT_TIME_FROM_SCHEDULE)))
            .andExpect(jsonPath("$.timeToSchedule").value(sameInstant(DEFAULT_TIME_TO_SCHEDULE)))
            .andExpect(jsonPath("$.timeNextSchedule").value(sameInstant(DEFAULT_TIME_NEXT_SCHEDULE)))
            .andExpect(jsonPath("$.documentContentType").value(DEFAULT_DOCUMENT_CONTENT_TYPE))
            .andExpect(jsonPath("$.document").value(Base64Utils.encodeToString(DEFAULT_DOCUMENT)))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION));
    }
    @Test
    public void getNonExistingReport() throws Exception {
        // Get the report
        restReportMockMvc.perform(get("/api/reports/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    public void updateReport() throws Exception {
        // Initialize the database
        reportService.save(report);

        int databaseSizeBeforeUpdate = reportRepository.findAll().size();

        // Update the report
        Report updatedReport = reportRepository.findById(report.getId()).get();
        updatedReport
            .name(UPDATED_NAME)
            .occurenceMode(UPDATED_OCCURENCE_MODE)
            .oneOffSchedule(UPDATED_ONE_OFF_SCHEDULE)
            .timeFromSchedule(UPDATED_TIME_FROM_SCHEDULE)
            .timeToSchedule(UPDATED_TIME_TO_SCHEDULE)
            .timeNextSchedule(UPDATED_TIME_NEXT_SCHEDULE)
            .document(UPDATED_DOCUMENT)
            .documentContentType(UPDATED_DOCUMENT_CONTENT_TYPE)
            .description(UPDATED_DESCRIPTION);

        restReportMockMvc.perform(put("/api/reports")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedReport)))
            .andExpect(status().isOk());

        // Validate the Report in the database
        List<Report> reportList = reportRepository.findAll();
        assertThat(reportList).hasSize(databaseSizeBeforeUpdate);
        Report testReport = reportList.get(reportList.size() - 1);
        assertThat(testReport.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testReport.getOccurenceMode()).isEqualTo(UPDATED_OCCURENCE_MODE);
        assertThat(testReport.getOneOffSchedule()).isEqualTo(UPDATED_ONE_OFF_SCHEDULE);
        assertThat(testReport.getTimeFromSchedule()).isEqualTo(UPDATED_TIME_FROM_SCHEDULE);
        assertThat(testReport.getTimeToSchedule()).isEqualTo(UPDATED_TIME_TO_SCHEDULE);
        assertThat(testReport.getTimeNextSchedule()).isEqualTo(UPDATED_TIME_NEXT_SCHEDULE);
        assertThat(testReport.getDocument()).isEqualTo(UPDATED_DOCUMENT);
        assertThat(testReport.getDocumentContentType()).isEqualTo(UPDATED_DOCUMENT_CONTENT_TYPE);
        assertThat(testReport.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
    }

    @Test
    public void updateNonExistingReport() throws Exception {
        int databaseSizeBeforeUpdate = reportRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restReportMockMvc.perform(put("/api/reports")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(report)))
            .andExpect(status().isBadRequest());

        // Validate the Report in the database
        List<Report> reportList = reportRepository.findAll();
        assertThat(reportList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    public void deleteReport() throws Exception {
        // Initialize the database
        reportService.save(report);

        int databaseSizeBeforeDelete = reportRepository.findAll().size();

        // Delete the report
        restReportMockMvc.perform(delete("/api/reports/{id}", report.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Report> reportList = reportRepository.findAll();
        assertThat(reportList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
