package com.moroapp.persistence.model;

import jakarta.persistence.*;

import java.util.Date;

@Entity
@Table(name = "production")
public class Production {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "production_seq_gen")
    @SequenceGenerator(name = "production_seq_gen", sequenceName = "production_id_seq", allocationSize = 1)
    private Long id_production;
    private int quantity_plots;
    private int quantity_affected_plots;
    private int spring_type;
    private Double expected_production;
    private Double lost_production;
    private Double real_production;
    private Date date_simulation;
    private Boolean invert;

    public Production() {
        date_simulation = new Date();
    }

    public Production(int quantity_plots, Double expected_production, Double lost_production, Double real_production, int spring_type, Boolean invert, int quantity_affected_plots) {
        this.quantity_plots = quantity_plots;
        this.expected_production = expected_production;
        this.lost_production = lost_production;
        this.real_production = real_production;
        this.spring_type = spring_type;
        this.date_simulation = new Date();
        this.quantity_affected_plots = quantity_affected_plots;
        this.invert = invert;
    }

    public int getQuantity_affected_plots() {
        return quantity_affected_plots;
    }

    public void setQuantity_affected_plots(int quantity_affected_plots) {
        this.quantity_affected_plots = quantity_affected_plots;
    }

    public Boolean getInvert() {
        return invert;
    }

    public void setInvert(Boolean invert) {
        this.invert = invert;
    }

    public int getSpring_type() {
        return spring_type;
    }

    public void setSpring_type(int spring_type) {
        this.spring_type = spring_type;
    }

    public int getQuantity_plots() {
        return quantity_plots;
    }

    public void setQuantity_plots(int quantity_plots) {
        this.quantity_plots = quantity_plots;
    }

    public Date getDate_simulation() {
        return date_simulation;
    }

    public void setDate_simulation(Date date_simulation) {
        this.date_simulation = date_simulation;
    }

    public Double getExpected_production() {
        return expected_production;
    }

    public void setExpected_production(Double expected_production) {
        this.expected_production = expected_production;
    }

    public Long getId_production() {
        return id_production;
    }

    public void setId_production(Long id_production) {
        this.id_production = id_production;
    }

    public Double getLost_production() {
        return lost_production;
    }

    public void setLost_production(Double lost_production) {
        this.lost_production = lost_production;
    }

    public Double getReal_production() {
        return real_production;
    }

    public void setReal_production(Double real_production) {
        this.real_production = real_production;
    }
}
