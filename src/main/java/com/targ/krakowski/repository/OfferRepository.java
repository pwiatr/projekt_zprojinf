package com.targ.krakowski.repository;

import com.targ.krakowski.domain.Offer;

import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the Offer entity.
 */
@SuppressWarnings("unused")
public interface OfferRepository extends JpaRepository<Offer,Long> {

}
