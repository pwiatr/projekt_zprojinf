package com.targ.krakowski.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.targ.krakowski.domain.Offer;

import com.targ.krakowski.repository.OfferRepository;
import com.targ.krakowski.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * REST controller for managing Offer.
 */
@RestController
public class OfferPublic {

    private final Logger log = LoggerFactory.getLogger(OfferPublic.class);

    private static final String ENTITY_NAME = "offerPublic";

    private final OfferRepository offerRepository;

    public OfferPublic(OfferRepository offerRepository) {
        this.offerRepository = offerRepository;
    }

    /**
     * GET  /offers : get all the offers.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of offers in body
     */
    @GetMapping("/offers")
    @PreAuthorize("permitAll()")
    @Timed
    public List<Offer> getAllOffers() {
        log.debug("REST request to get all Offers");
        List<Offer> offers = offerRepository.findAll();
        return offers;
    }
}
