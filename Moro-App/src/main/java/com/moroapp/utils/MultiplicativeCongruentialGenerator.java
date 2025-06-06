package com.moroapp.utils;

import java.util.ArrayList;
import java.util.List;

public class MultiplicativeCongruentialGenerator {

    public static List<Double> generateNumbers(int a, int module, int seed, int quantity) {
        List<Double> numbers = new ArrayList<>();
        int currentValue = seed;
        int nextValue;

        for (int i = 0; i < quantity; i++) {
            nextValue = (currentValue * a) % module;
            double u = (double) nextValue / module;
            numbers.add(Math.floor(u * 1000) / 1000.0);
            currentValue = nextValue;
        }
        return numbers;
    }
}
