package com.scheduling.report.repository;

import com.scheduling.report.domain.Recipient;

import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

/**
 * Spring Data MongoDB repository for the Recipient entity.
 */
@SuppressWarnings("unused")
@Repository
public interface RecipientRepository extends MongoRepository<Recipient, String> {
}
