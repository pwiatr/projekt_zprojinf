package com.targ.krakowski.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.targ.krakowski.domain.Picture;

import com.targ.krakowski.repository.PictureRepository;
import com.targ.krakowski.repository.search.PictureSearchRepository;
import com.targ.krakowski.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * REST controller for managing Picture.
 */
@RestController
@RequestMapping("/api")
public class PictureResource {

    private final Logger log = LoggerFactory.getLogger(PictureResource.class);

    private static final String ENTITY_NAME = "picture";
        
    private final PictureRepository pictureRepository;

    private final PictureSearchRepository pictureSearchRepository;

    public PictureResource(PictureRepository pictureRepository, PictureSearchRepository pictureSearchRepository) {
        this.pictureRepository = pictureRepository;
        this.pictureSearchRepository = pictureSearchRepository;
    }

    /**
     * POST  /pictures : Create a new picture.
     *
     * @param picture the picture to create
     * @return the ResponseEntity with status 201 (Created) and with body the new picture, or with status 400 (Bad Request) if the picture has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/pictures")
    @Timed
    public ResponseEntity<Picture> createPicture(@RequestBody Picture picture) throws URISyntaxException {
        log.debug("REST request to save Picture : {}", picture);
        if (picture.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new picture cannot already have an ID")).body(null);
        }
        Picture result = pictureRepository.save(picture);
        pictureSearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/pictures/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /pictures : Updates an existing picture.
     *
     * @param picture the picture to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated picture,
     * or with status 400 (Bad Request) if the picture is not valid,
     * or with status 500 (Internal Server Error) if the picture couldnt be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/pictures")
    @Timed
    public ResponseEntity<Picture> updatePicture(@RequestBody Picture picture) throws URISyntaxException {
        log.debug("REST request to update Picture : {}", picture);
        if (picture.getId() == null) {
            return createPicture(picture);
        }
        Picture result = pictureRepository.save(picture);
        pictureSearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, picture.getId().toString()))
            .body(result);
    }

    /**
     * GET  /pictures : get all the pictures.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of pictures in body
     */
    @GetMapping("/pictures")
    @Timed
    public List<Picture> getAllPictures() {
        log.debug("REST request to get all Pictures");
        List<Picture> pictures = pictureRepository.findAll();
        return pictures;
    }

    /**
     * GET  /pictures/:id : get the "id" picture.
     *
     * @param id the id of the picture to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the picture, or with status 404 (Not Found)
     */
    @GetMapping("/pictures/{id}")
    @Timed
    public ResponseEntity<Picture> getPicture(@PathVariable Long id) {
        log.debug("REST request to get Picture : {}", id);
        Picture picture = pictureRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(picture));
    }

    /**
     * DELETE  /pictures/:id : delete the "id" picture.
     *
     * @param id the id of the picture to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/pictures/{id}")
    @Timed
    public ResponseEntity<Void> deletePicture(@PathVariable Long id) {
        log.debug("REST request to delete Picture : {}", id);
        pictureRepository.delete(id);
        pictureSearchRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/pictures?query=:query : search for the picture corresponding
     * to the query.
     *
     * @param query the query of the picture search 
     * @return the result of the search
     */
    @GetMapping("/_search/pictures")
    @Timed
    public List<Picture> searchPictures(@RequestParam String query) {
        log.debug("REST request to search Pictures for query {}", query);
        return StreamSupport
            .stream(pictureSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }


}
