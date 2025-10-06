package com.realestate.server.common.services;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.StandardCopyOption;
import java.util.Objects;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class FileStorageService {

    private static final String STORAGE_DIRECTORY = "public";

    public void saveFile(MultipartFile fileToSave) throws IOException {
        if (fileToSave == null)
            throw new NullPointerException("File to save is null");

        var targetFile = new File(STORAGE_DIRECTORY + File.separator + fileToSave.getOriginalFilename());

        if (!Objects.equals(targetFile.getParent(), STORAGE_DIRECTORY))
            throw new SecurityException("Unsupported filename");

        Files.copy(fileToSave.getInputStream(), targetFile.toPath(), StandardCopyOption.REPLACE_EXISTING);

    }

    public File getDownloadFile(String fileName) throws FileDownloadException {

        if (fileName == null)
            throw new NullPointerException("File name is null");

        var filetoDownload = new File(STORAGE_DIRECTORY + File.separator + fileName);

        if (!Objects.equals(filetoDownload.getParent(), STORAGE_DIRECTORY))
            throw new SecurityException("Unsupported filename");

        if (!filetoDownload.exists())
            throw new FileDownloadException("File does not exist: " + fileName);

        return filetoDownload;
    }

    public static class FileDownloadException extends Exception {
        public FileDownloadException(String message) {
            super(message);
        }
    }

}
