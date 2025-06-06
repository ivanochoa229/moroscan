package com.moroapp.utils;

import org.apache.commons.math3.util.FastMath;

public final class Stadistics {

    public static double kolmogorovSmirnov(double alfa, int n) {
        validarAlfa(alfa);
        if (n <= 0) {
            throw new IllegalArgumentException("Tamaño de muestra debe ser positivo");
        }

        // Valores críticos aproximados basados en fórmulas estándar
        if (alfa == 0.10) {
            return 1.22 / FastMath.sqrt(n);
        } else if (alfa == 0.05) {
            return 1.36 / FastMath.sqrt(n);
        } else if (alfa == 0.025) {
            return 1.48 / FastMath.sqrt(n);
        } else if (alfa == 0.01) {
            return 1.63 / FastMath.sqrt(n);
        } else if (alfa == 0.005) {
            return 1.73 / FastMath.sqrt(n);
        } else if (alfa == 0.001) {
            return 1.95 / FastMath.sqrt(n);
        } else {
            throw new IllegalArgumentException("Valor de alfa no soportado. Use: 0.10, 0.05, 0.025, 0.01, 0.005 o 0.001");
        }
    }


    private static void validarAlfa(double alfa) {
        if (alfa <= 0 || alfa >= 1) {
            throw new IllegalArgumentException("Alfa debe estar entre 0 y 1");
        }
    }
}
