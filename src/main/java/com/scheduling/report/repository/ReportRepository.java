package com.scheduling.report.repository;

import com.scheduling.report.domain.Report;

import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

/**
 * Spring Data MongoDB repository for the Report entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ReportRepository extends MongoRepository<Report, String> {
}
