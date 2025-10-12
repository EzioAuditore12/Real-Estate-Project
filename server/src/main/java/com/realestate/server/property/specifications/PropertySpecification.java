package com.realestate.server.property.specifications;

import java.util.ArrayList;
import java.util.List;

import org.springframework.data.jpa.domain.Specification;

import com.realestate.server.property.dto.property.PropertySearchDto;
import com.realestate.server.property.entities.Property;

import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;

public class PropertySpecification {

    private static final String LOCATION = "location";

    private PropertySpecification() {
    }

    public static Specification<Property> withDynamicQuery(
            PropertySearchDto propertySearchDto) {

        return (root, query, criteriaBuilder) -> {
            List<Predicate> predicates = new ArrayList<>();

            addLocationPredicates(predicates, root, criteriaBuilder, propertySearchDto);
            addNumericPredicates(predicates, root, criteriaBuilder, propertySearchDto);
            addBooleanPredicates(predicates, root, criteriaBuilder, propertySearchDto);
            addListPredicates(predicates, root, propertySearchDto);

            return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
        };
    }

    private static void addLocationPredicates(List<Predicate> predicates, Root<Property> root,
            CriteriaBuilder criteriaBuilder, PropertySearchDto dto) {

        if (dto.getAddress() != null && !dto.getAddress().trim().isEmpty()) {
            predicates.add(criteriaBuilder.like(criteriaBuilder.lower(root.get(LOCATION).get("address")),
                    "%" + dto.getAddress().toLowerCase() + "%"));
        }

        if (dto.getCity() != null && !dto.getCity().trim().isEmpty()) {
            predicates.add(criteriaBuilder.equal(criteriaBuilder.lower(root.get(LOCATION).get("city")),
                    dto.getCity().toLowerCase()));
        }

        if (dto.getState() != null && !dto.getState().trim().isEmpty()) {
            predicates.add(criteriaBuilder.equal(criteriaBuilder.lower(root.get(LOCATION).get("state")),
                    dto.getState().toLowerCase()));
        }

        if (dto.getCountry() != null && !dto.getCountry().trim().isEmpty()) {
            predicates.add(criteriaBuilder.equal(criteriaBuilder.lower(root.get(LOCATION).get("country")),
                    dto.getCountry().toLowerCase()));
        }

        if (dto.getPostalCode() != null && !dto.getPostalCode().trim().isEmpty()) {
            predicates.add(criteriaBuilder.equal(root.get(LOCATION).get("postalCode"),
                    dto.getPostalCode()));
        }
    }

    private static void addNumericPredicates(List<Predicate> predicates, Root<Property> root,
            CriteriaBuilder criteriaBuilder, PropertySearchDto dto) {

        if (dto.getPricePerMonth() != null) {
            predicates.add(criteriaBuilder.lessThanOrEqualTo(root.get("pricePerMonth"), dto.getPricePerMonth()));
        }

        if (dto.getSecurityDeposit() != null) {
            predicates.add(criteriaBuilder.lessThanOrEqualTo(root.get("securityDeposit"), dto.getSecurityDeposit()));
        }

        if (dto.getBeds() != null) {
            predicates.add(criteriaBuilder.greaterThanOrEqualTo(root.get("beds"), dto.getBeds()));
        }

        if (dto.getBaths() != null) {
            predicates.add(criteriaBuilder.greaterThanOrEqualTo(root.get("baths"), dto.getBaths()));
        }

        if (dto.getSquareFeet() != null) {
            predicates.add(criteriaBuilder.greaterThanOrEqualTo(root.get("squareFeet"), dto.getSquareFeet()));
        }

        if (dto.getAverageRatings() != null) {
            predicates.add(criteriaBuilder.greaterThanOrEqualTo(root.get("averageRatings"), dto.getAverageRatings()));
        }

        if (dto.getNumberOfRatings() != null) {
            predicates.add(criteriaBuilder.greaterThanOrEqualTo(root.get("numberOfRatings"), dto.getNumberOfRatings()));
        }
    }

    private static void addBooleanPredicates(List<Predicate> predicates, Root<Property> root,
            CriteriaBuilder criteriaBuilder, PropertySearchDto dto) {

        if (dto.isPetAllowed()) {
            predicates.add(criteriaBuilder.isTrue(root.get("petAllowed")));
        }

        if (dto.isParkingIncluded()) {
            predicates.add(criteriaBuilder.isTrue(root.get("parkingIncluded")));
        }
    }

    private static void addListPredicates(List<Predicate> predicates, Root<Property> root, PropertySearchDto dto) {

        if (dto.getAmenities() != null && !dto.getAmenities().isEmpty()) {
            predicates.add(root.get("amenities").in(dto.getAmenities()));
        }

        if (dto.getHighlights() != null && !dto.getHighlights().isEmpty()) {
            predicates.add(root.get("highlights").in(dto.getHighlights()));
        }
    }
}
