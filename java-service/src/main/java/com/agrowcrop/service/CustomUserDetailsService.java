package com.agrowcrop.service;

import com.agrowcrop.model.User;
import com.agrowcrop.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

    private final UserRepository userRepo;

    @Override
    public UserDetails loadUserByUsername(String identifier) throws UsernameNotFoundException {
        User user = userRepo.findByPhone(identifier)
                .orElseGet(() -> userRepo.findByEmail(identifier)
                        .orElseThrow(
                                () -> new UsernameNotFoundException("User not found with identifier: " + identifier)));

        return new org.springframework.security.core.userdetails.User(
                user.getPhone() != null ? user.getPhone() : user.getEmail(),
                user.getPassword() != null ? user.getPassword() : "",
                Collections.singletonList(new SimpleGrantedAuthority(user.getRole())));
    }
}
