package com.realestate.server.user.dto;

import com.realestate.server.common.validators.StrongPassword;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CreateUserDto {
    
    @NotBlank
    @Size(max = 50)
    @Schema(example = "Saitama")
    private String name;

    @NotBlank
    @Email
    @Size(max = 240)
    @Schema(example = "example@example.com")
    private String email;

    private String avatar;

    @NotBlank
    @StrongPassword
    @Size(max = 16)
    @Schema(example = "Example@123")
    private String password;

    public void setEmail(String email) {
        this.email = (email!=null) ? email.toLowerCase() : null;
    }
}
