package com.hms.controller;

import com.hms.model.Doctor;
import com.hms.repository.DoctorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/doctors")
@CrossOrigin(origins = "*")
public class DoctorController {

    @Autowired
    private DoctorRepository repository;

    @GetMapping
    public List<Doctor> getAll() {
        return repository.findAll();
    }

    @PostMapping
    public Doctor add(@RequestBody Doctor doctor) {
        return repository.save(doctor);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        return repository.findById(id).map(doctor -> {
            repository.delete(doctor);
            return ResponseEntity.ok().build();
        }).orElse(ResponseEntity.notFound().build());
    }
}
