package com.targ.krakowski.repository;

import com.targ.krakowski.domain.Picture;

import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the Picture entity.
 */
@SuppressWarnings("unused")
public interface PictureRepository extends JpaRepository<Picture,Long> {

}
