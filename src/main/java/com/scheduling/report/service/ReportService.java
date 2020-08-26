package com.scheduling.report.service;

import com.scheduling.report.domain.Recipient;
import com.scheduling.report.domain.Report;
import com.scheduling.report.domain.enumeration.OccurenceMode;
import com.scheduling.report.repository.ReportRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.ZonedDateTime;
import java.util.List;
import java.util.Optional;
import java.util.Set;

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
        if(report.getOccurenceMode()== OccurenceMode.ONEOFF){
            report.setTimeFromSchedule(null);
            report.setTimeToSchedule(null);
            report.setTimeNextSchedule(null);
        }else if(report.getOccurenceMode() == OccurenceMode.CERTAINDATE){
            report.setTimeNextSchedule(null);
            report.setOneOffSchedule(null);
        }else {
            report.setOneOffSchedule(null);
            report.setTimeFromSchedule(null);
            report.setTimeToSchedule(null);
        }

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

    @Scheduled(cron = "0 0/1 * 1/1 * ?") // every 5 minutes
    public void dispatchReportsAccordingToSchedulingRules(){
        List<Report>reports = reportRepository.findAll();
        reports.stream().forEach(report -> {
            ZonedDateTime currentDate = ZonedDateTime.now();
            if(report.getOccurenceMode()==OccurenceMode.CERTAINDATE){
                if(report.getTimeToSchedule() != currentDate){
                    adjustRecurringScheduleUntilExpiration(report, currentDate);
                }
            }
            if(report.getOccurenceMode()==OccurenceMode.ONEOFF){
                setScheduleOnceAndTerminate(report, currentDate);
            }
            if(report.getOccurenceMode()==OccurenceMode.RECURRING){
                adjustRecurringSchedule(report, currentDate);
            }
        });
    }

    private void adjustRecurringSchedule(Report report, ZonedDateTime currentDate) {
        if(report.getTimeNextSchedule() == currentDate){
            sendEmailToRecepient(report);
            report.setTimeNextSchedule(currentDate.plusMinutes(10));
            reportRepository.save(report);
        }
    }

    private void setScheduleOnceAndTerminate(Report report, ZonedDateTime currentDate) {
        if(report.getOneOffSchedule() == currentDate){
            sendEmailAndTerminateSchedule(report);
        }
    }

    private void sendEmailAndTerminateSchedule(Report report) {
        sendEmailToRecepient(report);
        report.setOccurenceMode(OccurenceMode.CANCEL);
        reportRepository.save(report);
    }

    private void adjustRecurringScheduleUntilExpiration(Report report, ZonedDateTime currentDate) {
        if(report.getTimeFromSchedule() == currentDate){
            sendEmailToRecepient(report);
            report.setTimeFromSchedule(currentDate.plusMinutes(10));
            reportRepository.save(report);
        }else {
            sendEmailAndTerminateSchedule(report);
        }
    }

    private void sendEmailToRecepient(Report report) {
        report.getRecipients().forEach(this::accept);
    }

    private void accept(Recipient recipient) {
        log.info("Email notification sent to {}", recipient.getName());
    }
}
