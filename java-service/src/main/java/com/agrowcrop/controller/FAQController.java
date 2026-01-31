package com.agrowcrop.controller;

import com.agrowcrop.model.FAQ;
import com.agrowcrop.repository.FAQRepository;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/faqs")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3001")
public class FAQController {

    private final FAQRepository faqRepository;

    @GetMapping
    public ResponseEntity<List<FAQ>> getAllFaqs(@RequestParam(required = false) String category) {
        if (category != null && !category.isEmpty()) {
            return ResponseEntity.ok(faqRepository.findByCategoryIgnoreCase(category));
        }
        return ResponseEntity.ok(faqRepository.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<FAQ> getFaqById(@PathVariable("id") @NonNull String id) {
        return faqRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
