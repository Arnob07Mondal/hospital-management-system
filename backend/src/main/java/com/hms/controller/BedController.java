package com.hms.controller;

import com.hms.model.Bed;
import com.hms.repository.BedRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/beds")
@CrossOrigin(origins = "*")
public class BedController {

    @Autowired
    private BedRepository repository;

    @GetMapping
    public List<Bed> getAll() {
        return repository.findAll();
    }

    @PostMapping
    public Bed add(@RequestBody Bed bed) {
        return repository.save(bed);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        return repository.findById(id).map(bed -> {
            repository.delete(bed);
            return ResponseEntity.ok().build();
        }).orElse(ResponseEntity.notFound().build());
    }
}
