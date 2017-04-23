package com.targ.krakowski.repository.search;

import com.targ.krakowski.domain.Offer;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Offer entity.
 */
public interface OfferSearchRepository extends ElasticsearchRepository<Offer, Long> {
}
