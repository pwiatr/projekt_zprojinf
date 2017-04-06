package com.targ.krakowski.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.targ.krakowski.domain.ExtendedUser;

import com.targ.krakowski.repository.ExtendedUserRepository;
import com.targ.krakowski.repository.search.ExtendedUserSearchRepository;
import com.targ.krakowski.web.rest.util.HeaderUtil;
import com.targ.krakowski.service.dto.ExtendedUserDTO;
import com.targ.krakowski.service.mapper.ExtendedUserMapper;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * REST controller for managing ExtendedUser.
 */
@RestController
@RequestMapping("/api")
public class ExtendedUserResource {

    private final Logger log = LoggerFactory.getLogger(ExtendedUserResource.class);

    private static final String ENTITY_NAME = "extendedUser";
        
    private final ExtendedUserRepository extendedUserRepository;

    private final ExtendedUserMapper extendedUserMapper;

    private final ExtendedUserSearchRepository extendedUserSearchRepository;

    public ExtendedUserResource(ExtendedUserRepository extendedUserRepository, ExtendedUserMapper extendedUserMapper, ExtendedUserSearchRepository extendedUserSearchRepository) {
        this.extendedUserRepository = extendedUserRepository;
        this.extendedUserMapper = extendedUserMapper;
        this.extendedUserSearchRepository = extendedUserSearchRepository;
    }

    /**
     * POST  /extended-users : Create a new extendedUser.
     *
     * @param extendedUserDTO the extendedUserDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new extendedUserDTO, or with status 400 (Bad Request) if the extendedUser has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/extended-users")
    @Timed
    public ResponseEntity<ExtendedUserDTO> createExtendedUser(@RequestBody ExtendedUserDTO extendedUserDTO) throws URISyntaxException {
        log.debug("REST request to save ExtendedUser : {}", extendedUserDTO);
        if (extendedUserDTO.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new extendedUser cannot already have an ID")).body(null);
        }
        ExtendedUser extendedUser = extendedUserMapper.extendedUserDTOToExtendedUser(extendedUserDTO);
        extendedUser = extendedUserRepository.save(extendedUser);
        ExtendedUserDTO result = extendedUserMapper.extendedUserToExtendedUserDTO(extendedUser);
        extendedUserSearchRepository.save(extendedUser);
        return ResponseEntity.created(new URI("/api/extended-users/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /extended-users : Updates an existing extendedUser.
     *
     * @param extendedUserDTO the extendedUserDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated extendedUserDTO,
     * or with status 400 (Bad Request) if the extendedUserDTO is not valid,
     * or with status 500 (Internal Server Error) if the extendedUserDTO couldnt be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/extended-users")
    @Timed
    public ResponseEntity<ExtendedUserDTO> updateExtendedUser(@RequestBody ExtendedUserDTO extendedUserDTO) throws URISyntaxException {
        log.debug("REST request to update ExtendedUser : {}", extendedUserDTO);
        if (extendedUserDTO.getId() == null) {
            return createExtendedUser(extendedUserDTO);
        }
        ExtendedUser extendedUser = extendedUserMapper.extendedUserDTOToExtendedUser(extendedUserDTO);
        extendedUser = extendedUserRepository.save(extendedUser);
        ExtendedUserDTO result = extendedUserMapper.extendedUserToExtendedUserDTO(extendedUser);
        extendedUserSearchRepository.save(extendedUser);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, extendedUserDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /extended-users : get all the extendedUsers.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of extendedUsers in body
     */
    @GetMapping("/extended-users")
    @Timed
    public List<ExtendedUserDTO> getAllExtendedUsers() {
        log.debug("REST request to get all ExtendedUsers");
        List<ExtendedUser> extendedUsers = extendedUserRepository.findAll();
        return extendedUserMapper.extendedUsersToExtendedUserDTOs(extendedUsers);
    }

    /**
     * GET  /extended-users/:id : get the "id" extendedUser.
     *
     * @param id the id of the extendedUserDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the extendedUserDTO, or with status 404 (Not Found)
     */
    @GetMapping("/extended-users/{id}")
    @Timed
    public ResponseEntity<ExtendedUserDTO> getExtendedUser(@PathVariable Long id) {
        log.debug("REST request to get ExtendedUser : {}", id);
        ExtendedUser extendedUser = extendedUserRepository.findOne(id);
        ExtendedUserDTO extendedUserDTO = extendedUserMapper.extendedUserToExtendedUserDTO(extendedUser);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(extendedUserDTO));
    }

    /**
     * DELETE  /extended-users/:id : delete the "id" extendedUser.
     *
     * @param id the id of the extendedUserDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/extended-users/{id}")
    @Timed
    public ResponseEntity<Void> deleteExtendedUser(@PathVariable Long id) {
        log.debug("REST request to delete ExtendedUser : {}", id);
        extendedUserRepository.delete(id);
        extendedUserSearchRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/extended-users?query=:query : search for the extendedUser corresponding
     * to the query.
     *
     * @param query the query of the extendedUser search 
     * @return the result of the search
     */
    @GetMapping("/_search/extended-users")
    @Timed
    public List<ExtendedUserDTO> searchExtendedUsers(@RequestParam String query) {
        log.debug("REST request to search ExtendedUsers for query {}", query);
        return StreamSupport
            .stream(extendedUserSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .map(extendedUserMapper::extendedUserToExtendedUserDTO)
            .collect(Collectors.toList());
    }


}
