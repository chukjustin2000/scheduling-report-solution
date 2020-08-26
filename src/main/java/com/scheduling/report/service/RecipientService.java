package com.scheduling.report.service;

import com.scheduling.report.domain.Recipient;
import com.scheduling.report.domain.Report;
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
    private final ReportService reportService;

    public RecipientService(RecipientRepository recipientRepository, ReportService reportService) {
        this.recipientRepository = recipientRepository;
        this.reportService = reportService;
    }

    /**
     * Save a recipient.
     *
     * @param recipient the entity to save.
     * @return the persisted entity.
     */
    public Recipient save(Recipient recipient) {
        log.debug("Request to save Recipient : {}", recipient);
        Report report = recipient.getReport();
        Optional<Report>reportOptional = Optional.ofNullable(report);
        if(reportOptional.isPresent()) {
            Report report1 =reportOptional.get();
            report1.addRecipients(recipient);
            reportService.save(report1);
        }

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
