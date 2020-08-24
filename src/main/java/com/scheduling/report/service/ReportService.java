package com.scheduling.report.service;

import com.scheduling.report.domain.Report;
import com.scheduling.report.repository.ReportRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Optional;

/**
 * Service Implementation for managing {@link Report}.
 */
@Service
public class ReportService {

    private final Logger log = LoggerFactory.getLogger(ReportService.class);

    private final ReportRepository reportRepository;

    public ReportService(ReportRepository reportRepository) {
        this.reportRepository = reportRepository;
    }

    /**
     * Save a report.
     *
     * @param report the entity to save.
     * @return the persisted entity.
     */
    public Report save(Report report) {
        log.debug("Request to save Report : {}", report);
        return reportRepository.save(report);
    }

    /**
     * Get all the reports.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    public Page<Report> findAll(Pageable pageable) {
        log.debug("Request to get all Reports");
        return reportRepository.findAll(pageable);
    }


    /**
     * Get one report by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    public Optional<Report> findOne(String id) {
        log.debug("Request to get Report : {}", id);
        return reportRepository.findById(id);
    }

    /**
     * Delete the report by id.
     *
     * @param id the id of the entity.
     */
    public void delete(String id) {
        log.debug("Request to delete Report : {}", id);
        reportRepository.deleteById(id);
    }
}
