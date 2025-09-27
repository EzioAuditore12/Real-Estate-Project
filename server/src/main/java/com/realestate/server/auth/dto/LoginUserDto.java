package com.realestate.server.auth.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class LoginUserDto {
    
    @Email
    @Size(max = 240)
     @Schema(example = "example@example.com")
    private String email;

    @NotBlank
    @Schema(example = "Example@123")
    @Size(max = 16)
    private String password;

    public void setEmail(String email) {
        this.email = (email!=null) ? email.toLowerCase() : null;
    }
}
