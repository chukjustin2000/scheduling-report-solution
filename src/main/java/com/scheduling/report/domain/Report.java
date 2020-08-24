package com.scheduling.report.domain;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.DBRef;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.HashSet;
import java.util.Set;

import com.scheduling.report.domain.enumeration.OccurenceMode;

/**
 * A Report.
 */
@Document(collection = "report")
public class Report implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @NotNull
    @Field("name")
    private String name;

    @Field("occurence_mode")
    private OccurenceMode occurenceMode;

    @Field("one_off_schedule")
    private ZonedDateTime oneOffSchedule;

    @Field("time_from_schedule")
    private ZonedDateTime timeFromSchedule;

    @Field("time_to_schedule")
    private ZonedDateTime timeToSchedule;

    @Field("time_next_schedule")
    private ZonedDateTime timeNextSchedule;

    
    @Field("document")
    private byte[] document;

    @Field("document_content_type")
    private String documentContentType;

    @Field("description")
    private String description;

    @DBRef
    @Field("recipients")
    private Set<Recipient> recipients = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public Report name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public OccurenceMode getOccurenceMode() {
        return occurenceMode;
    }

    public Report occurenceMode(OccurenceMode occurenceMode) {
        this.occurenceMode = occurenceMode;
        return this;
    }

    public void setOccurenceMode(OccurenceMode occurenceMode) {
        this.occurenceMode = occurenceMode;
    }

    public ZonedDateTime getOneOffSchedule() {
        return oneOffSchedule;
    }

    public Report oneOffSchedule(ZonedDateTime oneOffSchedule) {
        this.oneOffSchedule = oneOffSchedule;
        return this;
    }

    public void setOneOffSchedule(ZonedDateTime oneOffSchedule) {
        this.oneOffSchedule = oneOffSchedule;
    }

    public ZonedDateTime getTimeFromSchedule() {
        return timeFromSchedule;
    }

    public Report timeFromSchedule(ZonedDateTime timeFromSchedule) {
        this.timeFromSchedule = timeFromSchedule;
        return this;
    }

    public void setTimeFromSchedule(ZonedDateTime timeFromSchedule) {
        this.timeFromSchedule = timeFromSchedule;
    }

    public ZonedDateTime getTimeToSchedule() {
        return timeToSchedule;
    }

    public Report timeToSchedule(ZonedDateTime timeToSchedule) {
        this.timeToSchedule = timeToSchedule;
        return this;
    }

    public void setTimeToSchedule(ZonedDateTime timeToSchedule) {
        this.timeToSchedule = timeToSchedule;
    }

    public ZonedDateTime getTimeNextSchedule() {
        return timeNextSchedule;
    }

    public Report timeNextSchedule(ZonedDateTime timeNextSchedule) {
        this.timeNextSchedule = timeNextSchedule;
        return this;
    }

    public void setTimeNextSchedule(ZonedDateTime timeNextSchedule) {
        this.timeNextSchedule = timeNextSchedule;
    }

    public byte[] getDocument() {
        return document;
    }

    public Report document(byte[] document) {
        this.document = document;
        return this;
    }

    public void setDocument(byte[] document) {
        this.document = document;
    }

    public String getDocumentContentType() {
        return documentContentType;
    }

    public Report documentContentType(String documentContentType) {
        this.documentContentType = documentContentType;
        return this;
    }

    public void setDocumentContentType(String documentContentType) {
        this.documentContentType = documentContentType;
    }

    public String getDescription() {
        return description;
    }

    public Report description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Set<Recipient> getRecipients() {
        return recipients;
    }

    public Report recipients(Set<Recipient> recipients) {
        this.recipients = recipients;
        return this;
    }

    public Report addRecipients(Recipient recipient) {
        this.recipients.add(recipient);
        recipient.setReport(this);
        return this;
    }

    public Report removeRecipients(Recipient recipient) {
        this.recipients.remove(recipient);
        recipient.setReport(null);
        return this;
    }

    public void setRecipients(Set<Recipient> recipients) {
        this.recipients = recipients;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Report)) {
            return false;
        }
        return id != null && id.equals(((Report) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Report{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", occurenceMode='" + getOccurenceMode() + "'" +
            ", oneOffSchedule='" + getOneOffSchedule() + "'" +
            ", timeFromSchedule='" + getTimeFromSchedule() + "'" +
            ", timeToSchedule='" + getTimeToSchedule() + "'" +
            ", timeNextSchedule='" + getTimeNextSchedule() + "'" +
            ", document='" + getDocument() + "'" +
            ", documentContentType='" + getDocumentContentType() + "'" +
            ", description='" + getDescription() + "'" +
            "}";
    }
}
