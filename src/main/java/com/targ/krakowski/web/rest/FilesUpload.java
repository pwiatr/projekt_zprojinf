package com.targ.krakowski.web.rest;
 
import com.codahale.metrics.annotation.Timed;
import com.targ.krakowski.domain.Offer;
import com.targ.krakowski.repository.OfferRepository;
import com.targ.krakowski.storage.StorageService;
import com.targ.krakowski.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;
 
import javax.print.DocFlavor;
import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
 
/**
 * Created by panpr on 21.05.2017.
 */
 
@RestController
@RequestMapping("/api/public")
public class FilesUpload {
    private final Logger log = LoggerFactory.getLogger(OfferPublic.class);
 
    private static final String ENTITY_NAME = "file";
 
    private final StorageService storageService;
 
    @Autowired
    public FilesUpload(StorageService storageService){
        this.storageService = storageService;
    }
 
    /**
     * GET  /offers : get all the offers.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of offers in body
     */
    @GetMapping("/files")
    @PreAuthorize("permitAll()")
    @Timed
    public List<String> getAllFiles() {
        log.debug("REST request to get all files");
        List<String> list = new ArrayList<String>();
        list.add("SHIT");
        return list;
    }
 
    @PostMapping("/files")
    @Timed
    public String handleFileUpload(@RequestParam("file") MultipartFile file) throws URISyntaxException {
        log.debug("REST request to handle file upload Offer : {}", file.getOriginalFilename().toString());
        storageService.store(file);
        return "success";
    }
}