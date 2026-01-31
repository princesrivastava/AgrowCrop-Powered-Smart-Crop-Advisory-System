package com.agrowcrop.controller;

import com.agrowcrop.model.Region;
import com.agrowcrop.repository.RegionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/regions")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3001")
public class RegionController {

    private final RegionRepository regionRepository;

    @GetMapping
    public ResponseEntity<List<Region>> getAllRegions() {
        return ResponseEntity.ok(regionRepository.findAll());
    }

    @GetMapping("/{state}")
    public ResponseEntity<Region> getRegionByState(@PathVariable String state) {
        return regionRepository.findByStateIgnoreCase(state)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
