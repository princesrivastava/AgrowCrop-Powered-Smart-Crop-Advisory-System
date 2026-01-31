package com.agrowcrop.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "faqs")
public class FAQ {
    @Id
    private String id;

    private Integer originalId;
    private String question;
    private String answer;
    private String category;
}
