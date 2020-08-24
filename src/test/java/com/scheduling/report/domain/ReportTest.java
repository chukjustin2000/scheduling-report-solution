package com.scheduling.report.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.scheduling.report.web.rest.TestUtil;

public class ReportTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Report.class);
        Report report1 = new Report();
        report1.setId("id1");
        Report report2 = new Report();
        report2.setId(report1.getId());
        assertThat(report1).isEqualTo(report2);
        report2.setId("id2");
        assertThat(report1).isNotEqualTo(report2);
        report1.setId(null);
        assertThat(report1).isNotEqualTo(report2);
    }
}
