package com.agrowcrop.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AuthRequest {
    private String phone;
    private String otp;
    private String email;
    private String password;
}
