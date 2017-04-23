package com.targ.krakowski.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.springframework.data.elasticsearch.annotations.Document;

import javax.persistence.*;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A Address.
 */
@Entity
@Table(name = "address")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "address")
public class Address implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Size(max = 30)
    @Column(name = "city", length = 30)
    private String city;

    @Size(max = 30)
    @Column(name = "street", length = 30)
    private String street;

    @Size(max = 30)
    @Column(name = "voivodeship", length = 30)
    private String voivodeship;

    @Size(max = 10)
    @Column(name = "number", length = 10)
    private String number;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCity() {
        return city;
    }

    public Address city(String city) {
        this.city = city;
        return this;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getStreet() {
        return street;
    }

    public Address street(String street) {
        this.street = street;
        return this;
    }

    public void setStreet(String street) {
        this.street = street;
    }

    public String getVoivodeship() {
        return voivodeship;
    }

    public Address voivodeship(String voivodeship) {
        this.voivodeship = voivodeship;
        return this;
    }

    public void setVoivodeship(String voivodeship) {
        this.voivodeship = voivodeship;
    }

    public String getNumber() {
        return number;
    }

    public Address number(String number) {
        this.number = number;
        return this;
    }

    public void setNumber(String number) {
        this.number = number;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Address address = (Address) o;
        if (address.id == null || id == null) {
            return false;
        }
        return Objects.equals(id, address.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "Address{" +
            "id=" + id +
            ", city='" + city + "'" +
            ", street='" + street + "'" +
            ", voivodeship='" + voivodeship + "'" +
            ", number='" + number + "'" +
            '}';
    }
}
