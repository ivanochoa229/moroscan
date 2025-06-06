package com.moroapp.service;

import com.moroapp.presentation.dto.request.ProductionRequest;
import com.moroapp.presentation.dto.response.ProductionResponse;

import java.util.List;

public interface ProductionService {
    ProductionResponse simulateProduction(ProductionRequest productionRequest);
    ProductionResponse findById(Long id);
    List<ProductionResponse> findAll();
}
