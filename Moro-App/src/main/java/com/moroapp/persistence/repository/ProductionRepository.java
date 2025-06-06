package com.moroapp.persistence.repository;

import com.moroapp.persistence.model.Production;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductionRepository extends JpaRepository<Production, Long> {
}
