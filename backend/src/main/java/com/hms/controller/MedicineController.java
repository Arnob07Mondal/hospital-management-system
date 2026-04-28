package com.hms.controller;

import com.hms.model.Medicine;
import com.hms.repository.MedicineRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/medicines")
@CrossOrigin(origins = "*")
public class MedicineController {

    @Autowired
    private MedicineRepository repository;

    @GetMapping
    public List<Medicine> getAll() {
        return repository.findAll();
    }

    @PostMapping
    public Medicine add(@RequestBody Medicine medicine) {
        return repository.save(medicine);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        return repository.findById(id).map(medicine -> {
            repository.delete(medicine);
            return ResponseEntity.ok().build();
        }).orElse(ResponseEntity.notFound().build());
    }
}
