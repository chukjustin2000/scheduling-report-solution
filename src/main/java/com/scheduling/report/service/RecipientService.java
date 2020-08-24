package com.scheduling.report.service;

import com.scheduling.report.domain.Recipient;
import com.scheduling.report.repository.RecipientRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Optional;

/**
 * Service Implementation for managing {@link Recipient}.
 */
@Service
public class RecipientService {

    private final Logger log = LoggerFactory.getLogger(RecipientService.class);

    private final RecipientRepository recipientRepository;

    public RecipientService(RecipientRepository recipientRepository) {
        this.recipientRepository = recipientRepository;
    }

    /**
     * Save a recipient.
     *
     * @param recipient the entity to save.
     * @return the persisted entity.
     */
    public Recipient save(Recipient recipient) {
        log.debug("Request to save Recipient : {}", recipient);
        return recipientRepository.save(recipient);
    }

    /**
     * Get all the recipients.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    public Page<Recipient> findAll(Pageable pageable) {
        log.debug("Request to get all Recipients");
        return recipientRepository.findAll(pageable);
    }


    /**
     * Get one recipient by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    public Optional<Recipient> findOne(String id) {
        log.debug("Request to get Recipient : {}", id);
        return recipientRepository.findById(id);
    }

    /**
     * Delete the recipient by id.
     *
     * @param id the id of the entity.
     */
    public void delete(String id) {
        log.debug("Request to delete Recipient : {}", id);
        recipientRepository.deleteById(id);
    }
}
