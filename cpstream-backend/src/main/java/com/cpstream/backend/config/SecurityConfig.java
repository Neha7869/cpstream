package com.cpstream.backend.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration
public class SecurityConfig {

    @Value("${frontend.url:http://localhost:3000}")
    private String frontendUrl;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        http
                // CORS
                .cors(Customizer.withDefaults())

                // CSRF disabled for APIs
                .csrf(csrf -> csrf.disable())

                // Authorization rules
                .authorizeHttpRequests(auth -> auth

                        // Allow preflight requests
                        .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()

                        // Livekit webhook (public)
                        .requestMatchers(HttpMethod.POST, "/api/livekit/webhook").permitAll()

                        // Protected LiveKit ingress endpoints
                        .requestMatchers(HttpMethod.POST, "/api/livekit/ingress").authenticated()
                        .requestMatchers(HttpMethod.DELETE, "/api/livekit/ingress/**").authenticated()

                        // Protected stream APIs
                        .requestMatchers(HttpMethod.GET, "/api/streams/user/*/keys").authenticated()
                        .requestMatchers(HttpMethod.PATCH, "/api/streams/**").authenticated()

                        // everything else allowed
                        .anyRequest().permitAll()
                )

                // ✅ Clerk JWT authentication (IMPORTANT PART)
                .oauth2ResourceServer(oauth2 ->
                        oauth2.jwt(Customizer.withDefaults())
                );

        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {

        CorsConfiguration config = new CorsConfiguration();

        config.setAllowedOriginPatterns(List.of(
                "http://localhost:3000",
                "http://127.0.0.1:3000",
                "https://cpstream-frontend.vercel.app",
                "https://*.vercel.app"
        ));

        config.setAllowedMethods(List.of(
                "GET",
                "POST",
                "PUT",
                "PATCH",
                "DELETE",
                "OPTIONS"
        ));

        config.setAllowedHeaders(List.of("*"));
        config.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);

        return source;
    }
}