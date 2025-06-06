package com.moroapp.utils;

import org.apache.commons.math3.distribution.NormalDistribution;

import java.util.Random;

public class ProbabilisticDistributions {
    private static final Random random = new Random();

    public static double normalDistribution(double media, double desviacion) {
        return media + desviacion * random.nextGaussian();
    }

    public static double uniformDistribution(double a, double b, double u) {
        if (b <= a) {
            throw new IllegalArgumentException("b debe ser mayor que a");
        }
        return a + (b - a) * u;
    }

}
