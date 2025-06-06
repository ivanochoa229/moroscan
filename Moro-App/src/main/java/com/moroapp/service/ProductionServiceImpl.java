package com.moroapp.service;

import com.moroapp.persistence.model.Production;
import com.moroapp.persistence.repository.ProductionRepository;
import com.moroapp.presentation.dto.request.ProductionRequest;
import com.moroapp.presentation.dto.response.ProductionResponse;
import com.moroapp.utils.KolmogorovSmirnovTest;
import com.moroapp.utils.MultiplicativeCongruentialGenerator;
import com.moroapp.utils.ProbabilisticDistributions;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.List;
import java.util.Optional;
import java.util.Random;
import java.util.stream.Collectors;

@Service
public class ProductionServiceImpl implements ProductionService {

    private final ProductionRepository productionRepository;

    public ProductionServiceImpl(ProductionRepository productionRepository) {
        this.productionRepository = productionRepository;
    }

    @Override
    public ProductionResponse simulateProduction(ProductionRequest productionRequest) {
        SimpleDateFormat sdf = new SimpleDateFormat("dd-MM-yyyy");
        int quantity_plots = productionRequest.quantity_plots(), p = 0, springType, quantity_affected_plots = 0;
        double productionExpected= 0.0, productionLost = 0.0;
        Boolean invert;
        Double number = GenerateRandomNumber();
        if(number <= 0.3){
            springType = 1;
        }else if(number <= 0.8){
            springType = 2;
        } else{
            springType = 3;
        }
        while(p < quantity_plots){
            number = GenerateRandomNumber();
            double prod = ProbabilisticDistributions.uniformDistribution(200, 400, number);
            double floorQuality = ProbabilisticDistributions.normalDistribution(0, 20)/100;
            double careQuality = ProbabilisticDistributions.normalDistribution(0, 10)/100;
            prod = (1+floorQuality + careQuality) * prod;
            productionExpected = productionExpected + prod;
            if(springType == 1){
                number = GenerateRandomNumber();
                if(number <= 0.6){
                    number = GenerateRandomNumber();
                    double damaged = ProbabilisticDistributions.uniformDistribution(20, 50, number)/100;
                    productionLost = productionLost + prod*damaged;
                    quantity_affected_plots++;
                }
            }else if(springType == 2){
                number = GenerateRandomNumber();
                if(number <= 0.3){
                    number = GenerateRandomNumber();
                    double damaged = ProbabilisticDistributions.uniformDistribution(20, 50, number)/100;
                    productionLost = productionLost + prod*damaged;
                    quantity_affected_plots++;
                }
            }else{
                number = GenerateRandomNumber();
                if(number <= 0.1){
                    number = GenerateRandomNumber();
                    double damaged = ProbabilisticDistributions.uniformDistribution(20, 50, number)/100;
                    productionLost = productionLost + prod*damaged;
                    quantity_affected_plots++;
                }
            }
            p++;
        }
        double globalLostPercentage = productionLost/productionExpected;
        System.out.println("GLOBAL PERCENT : " + globalLostPercentage);
        double realProduction = productionExpected - productionLost;
        if(globalLostPercentage <= 0.25){
            invert = false;
        }else{
            invert = true;
        }
        Production production = new Production(quantity_plots, productionExpected, productionLost, realProduction, springType, invert, quantity_affected_plots);
        productionRepository.save(production);
        String formattedDate = sdf.format( production.getDate_simulation());
        return new ProductionResponse(production.getId_production(), quantity_plots, productionExpected, productionLost, realProduction, formattedDate, springType, invert, quantity_affected_plots);
    }

    @Override
    public ProductionResponse findById(Long id) {
        Optional<Production> production = productionRepository.findById(id);
        if (!production.isPresent()) {
            return null;
        }
        Production productionData = production.get();
        SimpleDateFormat sdf = new SimpleDateFormat("dd-MM-yyyy");
        String formattedDate = sdf.format(productionData.getDate_simulation());
        return new ProductionResponse(productionData.getId_production(),
                productionData.getQuantity_plots(),
                productionData.getExpected_production(),
                productionData.getLost_production(),
                productionData.getReal_production(),
                formattedDate,
                productionData.getSpring_type(),
                productionData.getInvert(),
        productionData.getQuantity_affected_plots());
    }

    @Override
    public List<ProductionResponse> findAll() {
        List<Production> productions = productionRepository.findAll();
        SimpleDateFormat sdf = new SimpleDateFormat("dd-MM-yyyy");

        return productions.stream()
                .map(prod -> new ProductionResponse(
                        prod.getId_production(),
                        prod.getQuantity_plots(),
                        prod.getExpected_production(),
                        prod.getLost_production(),
                        prod.getReal_production(),
                        sdf.format(prod.getDate_simulation()),
                        prod.getSpring_type(),
                        prod.getInvert(),
                        prod.getQuantity_affected_plots()
                ))
                .collect(Collectors.toList());
    }

    private Double GenerateRandomNumber() {
        Random random = new Random();
        while (true) {  // Bucle infinito hasta que se cumpla la condición
            int a = random.nextInt(9000) + 1000;
            int seed =random.nextInt(9000) + 1000;  ;
            int module = random.nextInt(900) + 100;

            // Genera 10 números pseudoaleatorios (puedes ajustar la cantidad)
            List<Double> pseudoNumbers = MultiplicativeCongruentialGenerator.generateNumbers(a, seed, module, 50);
            // Verifica si pasan la prueba de Kolmogorov-Smirnov
            boolean isRandom = KolmogorovSmirnovTest.checkSample(pseudoNumbers);

            if (isRandom) {
                // Devuelve el primer número de la lista (o puedes elegir otro criterio)
                int randomIndex = random.nextInt(pseudoNumbers.size());
                return pseudoNumbers.get(randomIndex);
            }
            // Si no pasa la prueba, repite el proceso
        }
    }
}
