package com.agrowcrop;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class AgrowCropApplication {
    public static void main(String[] args) {
        SpringApplication.run(AgrowCropApplication.class, args);
    }
}
