package com.hms.controller;

import com.hms.model.Prescription;
import com.hms.repository.PrescriptionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/prescriptions")
@CrossOrigin(origins = "*")
public class PrescriptionController {

    @Autowired
    private PrescriptionRepository repository;

    @GetMapping
    public List<Prescription> getAll() {
        return repository.findAll();
    }

    @PostMapping
    public Prescription add(@RequestBody Prescription prescription) {
        return repository.save(prescription);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        return repository.findById(id).map(prescription -> {
            repository.delete(prescription);
            return ResponseEntity.ok().build();
        }).orElse(ResponseEntity.notFound().build());
    }
}
