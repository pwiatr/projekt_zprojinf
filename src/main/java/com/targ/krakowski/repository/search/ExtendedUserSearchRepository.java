package com.targ.krakowski.repository.search;

import com.targ.krakowski.domain.ExtendedUser;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the ExtendedUser entity.
 */
public interface ExtendedUserSearchRepository extends ElasticsearchRepository<ExtendedUser, Long> {
}
