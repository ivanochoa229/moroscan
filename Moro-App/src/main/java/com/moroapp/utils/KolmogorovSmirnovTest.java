package com.moroapp.utils;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class KolmogorovSmirnovTest {
    public KolmogorovSmirnovTest(List<Double> sharedNumbers) {
    }

    // Valor alpha fijo
    private static final double ALPHA = 0.10;

    // Constructor privado para evitar instanciación
    private KolmogorovSmirnovTest() {
        throw new IllegalStateException("Clase de utilidad, no se puede instanciar");
    }

    public static boolean checkSample(List<Double> sample) {
        // Validación de entrada
        if (sample == null || sample.isEmpty()) {
            throw new IllegalArgumentException("La muestra no puede ser nula o vacía");
        }

        // Ordenar la muestra
        Collections.sort(sample);

        // Calcular distribución acumulada empírica
        List<Double> empiricalCDF = new ArrayList<>();
        for (int i = 1; i <= sample.size(); i++) {
            empiricalCDF.add((double) i / sample.size());
        }

        // Calcular estadístico D de Kolmogorov-Smirnov
        double dStatistic = 0.0;
        for (int i = 0; i < sample.size(); i++) {
            double diff = Math.abs(empiricalCDF.get(i) - sample.get(i));
            if (diff > dStatistic) {
                dStatistic = diff;
            }
        }

        // Obtener valor crítico
        double criticalValue = Stadistics.kolmogorovSmirnov(ALPHA, sample.size());

        // Comparar estadístico con valor crítico
        return dStatistic < criticalValue;
    }
}
