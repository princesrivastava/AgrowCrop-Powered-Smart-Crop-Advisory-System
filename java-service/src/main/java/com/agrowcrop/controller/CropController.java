package com.agrowcrop.controller;

import com.agrowcrop.model.Crop;
import com.agrowcrop.repository.CropRepository;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/crops")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3001")
public class CropController {

    private final CropRepository cropRepository;

    @GetMapping
    public ResponseEntity<List<Crop>> getAllCrops() {
        return ResponseEntity.ok(cropRepository.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Crop> getCropById(@PathVariable("id") @NonNull String id) {
        return cropRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/season/{season}")
    public ResponseEntity<List<Crop>> getCropsBySeason(@PathVariable @NonNull String season) {
        return ResponseEntity.ok(cropRepository.findBySeasonOrSeason(season, "All"));
    }
}
