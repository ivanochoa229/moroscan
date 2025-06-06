package com.moroapp.presentation.controller;

import com.moroapp.presentation.dto.request.ProductionRequest;
import com.moroapp.presentation.dto.response.ProductionResponse;
import com.moroapp.service.ProductionService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/production")
@CrossOrigin(origins = "http://localhost:3000")
public class ProductionController {

    private final ProductionService productionService;

    public ProductionController(ProductionService productionService) {
        this.productionService = productionService;
    }

    @GetMapping("/{id_production}")
    ResponseEntity<ProductionResponse> findById(@PathVariable Long id_production){
        return ResponseEntity.ok(productionService.findById(id_production));
    }

    @GetMapping
    ResponseEntity<List<ProductionResponse>> findAll(){
        return ResponseEntity.ok(productionService.findAll());
    }

    @PostMapping
    ResponseEntity<ProductionResponse> simulateProduction(@RequestBody ProductionRequest productionRequest){
        return ResponseEntity.ok(productionService.simulateProduction(productionRequest));
    }

}
