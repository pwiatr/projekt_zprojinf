package com.targ.krakowski.repository;

import com.targ.krakowski.domain.ExtendedUser;

import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the ExtendedUser entity.
 */
@SuppressWarnings("unused")
public interface ExtendedUserRepository extends JpaRepository<ExtendedUser,Long> {

}
