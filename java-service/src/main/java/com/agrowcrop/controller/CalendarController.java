package com.agrowcrop.controller;

import com.agrowcrop.model.Crop;
import com.agrowcrop.repository.CropRepository;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/calendar")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3001")
public class CalendarController {

    private final CropRepository cropRepository;

    @GetMapping("/{cropId}")
    public ResponseEntity<Map<String, Object>> getCropCalendar(@PathVariable("cropId") @NonNull String cropId) {
        return cropRepository.findById(cropId)
                .map(crop -> {
                    Map<String, Object> calendar = new HashMap<>();
                    calendar.put("cropName", crop.getName());
                    calendar.put("hindiName", crop.getHindiName());
                    calendar.put("season", crop.getSeason());
                    calendar.put("duration", crop.getDuration());
                    calendar.put("timeline", generateMonthlyTimeline(crop));

                    Map<String, List<String>> activities = new HashMap<>();
                    activities.put("sowing", crop.getSowingMonths());
                    activities.put("growth", crop.getGrowthMonths());
                    activities.put("harvesting", crop.getHarvestingMonths());
                    calendar.put("activities", activities);

                    return ResponseEntity.ok(calendar);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    private List<Map<String, Object>> generateMonthlyTimeline(Crop crop) {
        String[] months = {
                "January", "February", "March", "April", "May", "June",
                "July", "August", "September", "October", "November", "December"
        };

        return Arrays.stream(months).map(month -> {
            boolean isSowing = isMonthMatched(crop.getSowingMonths(), month);
            boolean isGrowth = isMonthMatched(crop.getGrowthMonths(), month);
            boolean isHarvesting = isMonthMatched(crop.getHarvestingMonths(), month);

            List<String> dailyActivities = new ArrayList<>();
            if (isSowing)
                dailyActivities.add("Sowing");
            if (isGrowth)
                dailyActivities.add("Growth");
            if (isHarvesting)
                dailyActivities.add("Harvesting");

            Map<String, Object> monthData = new HashMap<>();
            monthData.put("month", month);
            monthData.put("activities", dailyActivities.isEmpty() ? List.of("Rest Period") : dailyActivities);
            monthData.put("irrigation",
                    (isGrowth || isSowing)
                            ? (crop.getIrrigationPercentage() != null ? crop.getIrrigationPercentage() : 60)
                            : 0);

            String fertilizer = null;
            if (isSowing)
                fertilizer = "Apply base fertilizer";
            else if (isGrowth)
                fertilizer = "Apply top dressing";
            monthData.put("fertilizer", fertilizer);

            return monthData;
        }).collect(Collectors.toList());
    }

    private boolean isMonthMatched(List<String> monthList, String month) {
        if (monthList == null)
            return false;
        String shortMonth = month.toLowerCase().substring(0, 3);
        return monthList.stream()
                .anyMatch(m -> m.toLowerCase().contains(shortMonth));
    }
}
