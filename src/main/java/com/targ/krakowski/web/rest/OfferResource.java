package com.targ.krakowski.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.targ.krakowski.config.Constants;
import com.targ.krakowski.domain.ExtendedUser;
import com.targ.krakowski.domain.Offer;

import com.targ.krakowski.repository.OfferRepository;
import com.targ.krakowski.repository.search.OfferSearchRepository;
import com.targ.krakowski.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
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
@RequestMapping("/api")
public class OfferResource {

    private final Logger log = LoggerFactory.getLogger(OfferResource.class);

    private static final String ENTITY_NAME = "offer";

    private final OfferRepository offerRepository;

    private final OfferSearchRepository offerSearchRepository;

    public OfferResource(OfferRepository offerRepository, OfferSearchRepository offerSearchRepository) {
        this.offerRepository = offerRepository;
        this.offerSearchRepository = offerSearchRepository;
    }

    /**
     * POST  /offers : Create a new offer.
     *
     * @param offer the offer to create
     * @return the ResponseEntity with status 201 (Created) and with body the new offer, or with status 400 (Bad Request) if the offer has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/offers")
    @Timed
    public ResponseEntity<Offer> createOffer(@Valid @RequestBody Offer offer) throws URISyntaxException {
        log.debug("REST request to save Offer : {}", offer);
        if (offer.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new offer cannot already have an ID")).body(null);
        }
        Offer result = offerRepository.save(offer);
        offerSearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/offers/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /offers : Updates an existing offer.
     *
     * @param offer the offer to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated offer,
     * or with status 400 (Bad Request) if the offer is not valid,
     * or with status 500 (Internal Server Error) if the offer couldnt be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/offers")
    @Timed
    public ResponseEntity<Offer> updateOffer(@Valid @RequestBody Offer offer) throws URISyntaxException {
        log.debug("REST request to update Offer : {}", offer);
        if (offer.getId() == null) {
            return createOffer(offer);
        }
        Offer result = offerRepository.save(offer);
        offerSearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, offer.getId().toString()))
            .body(result);
    }

    /**
     * GET  /offers : get all the offers.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of offers in body
     */
    @GetMapping("/offers")
    @Timed
    public List<Offer> getAllOffers() {
        log.debug("REST request to get all Offers");
        List<Offer> offers = offerRepository.findAll();
        return offers;
    }

    /**
     * GET  /offers/:login : get offers from user.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of offers in body
     */
    @GetMapping("/offers/user/{login:" + Constants.LOGIN_REGEX + "}")
    @Timed
    public List<Offer> getAllOffersFromUser(@PathVariable String login) {
        log.debug("REST request to get all Offers from user");
        List<Offer> allOffers = offerRepository.findAll();
        List<Offer> userOffers = allOffers.stream()
            .filter(o -> o.getExtendedUser().getUser().getLogin().equalsIgnoreCase(login))
            .collect(Collectors.toList());
        return userOffers;
    }

    /**
     * GET  /offers/:id : get the "id" offer.
     *
     * @param id the id of the offer to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the offer, or with status 404 (Not Found)
     */
    @GetMapping("/offers/{id}")
    @Timed
    public ResponseEntity<Offer> getOffer(@PathVariable Long id) {
        log.debug("REST request to get Offer : {}", id);
        Offer offer = offerRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(offer));
    }
//
//    /**
//     * GET  /offers/:login/:id : get the "id" offer from :login user
//     *
//     * @param id the id of the offer to retrieve
//     * @return the ResponseEntity with status 200 (OK) and with body the offer, or with status 404 (Not Found)
//     */
//    @GetMapping("/offers/{login:"+ Constants.LOGIN_REGEX + "}/{id}")
//    @Timed
//    public ResponseEntity<Offer> getOfferFromUser(@PathVariable Long id) {
//        log.debug("REST request to get Offer : {}", id);
//        Offer offer = offerRepository.findOne(id);
//        String loggedInUser = offer.getExtendedUser().getUser().getLogin();
//        if()
//        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(offer));
//    }

    /**
     * DELETE  /offers/:id : delete the "id" offer.
     *
     * @param id the id of the offer to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/offers/{id}")
    @Timed
    public ResponseEntity<Void> deleteOffer(@PathVariable Long id) {
        log.debug("REST request to delete Offer : {}", id);
        offerRepository.delete(id);
        offerSearchRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/offers?query=:query : search for the offer corresponding
     * to the query.
     *
     * @param query the query of the offer search
     * @return the result of the search
     */
    @GetMapping("/_search/offers")
    @Timed
    public List<Offer> searchOffers(@RequestParam String query) {
        log.debug("REST request to search Offers for query {}", query);
        return StreamSupport
            .stream(offerSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }


}
