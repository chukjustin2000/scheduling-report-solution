package com.scheduling.report.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.scheduling.report.web.rest.TestUtil;

public class RecipientTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Recipient.class);
        Recipient recipient1 = new Recipient();
        recipient1.setId("id1");
        Recipient recipient2 = new Recipient();
        recipient2.setId(recipient1.getId());
        assertThat(recipient1).isEqualTo(recipient2);
        recipient2.setId("id2");
        assertThat(recipient1).isNotEqualTo(recipient2);
        recipient1.setId(null);
        assertThat(recipient1).isNotEqualTo(recipient2);
    }
}
