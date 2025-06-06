package com.moroapp.presentation.dto.response;


public record ProductionResponse(Long id_production, int quantity_plots,
                                 Double expected_production,
                                 Double lost_production,
                                 Double real_production,
                                 String date_simulation,
                                 int spring_type,
                                 Boolean invert,
                                 int quantity_affected_plots) {
}
