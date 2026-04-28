package com.hms.controller;

import com.hms.model.Bill;
import com.hms.repository.BillRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/bills")
@CrossOrigin(origins = "*")
public class BillController {

    @Autowired
    private BillRepository repository;

    @GetMapping
    public List<Bill> getAll() {
        return repository.findAll();
    }

    @PostMapping
    public Bill add(@RequestBody Bill bill) {
        return repository.save(bill);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        return repository.findById(id).map(bill -> {
            repository.delete(bill);
            return ResponseEntity.ok().build();
        }).orElse(ResponseEntity.notFound().build());
    }
}
