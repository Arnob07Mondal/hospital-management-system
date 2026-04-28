INSERT INTO doctor (name, specialty, contact) VALUES ('Dr. Alice Smith', 'Cardiology', '555-0101');
INSERT INTO doctor (name, specialty, contact) VALUES ('Dr. Bob Jones', 'Neurology', '555-0102');
INSERT INTO doctor (name, specialty, contact) VALUES ('Dr. Charlie Brown', 'General Practice', '555-0103');

INSERT INTO bed (bed_number, ward_type, is_occupied) VALUES ('101A', 'General', false);
INSERT INTO bed (bed_number, ward_type, is_occupied) VALUES ('101B', 'General', false);
INSERT INTO bed (bed_number, ward_type, is_occupied) VALUES ('201A', 'ICU', false);
INSERT INTO bed (bed_number, ward_type, is_occupied) VALUES ('301A', 'Private', false);

INSERT INTO medicine (name, price, stock_quantity) VALUES ('Paracetamol 500mg', 5.0, 1000);
INSERT INTO medicine (name, price, stock_quantity) VALUES ('Amoxicillin 250mg', 12.5, 500);
INSERT INTO medicine (name, price, stock_quantity) VALUES ('Ibuprofen 400mg', 8.0, 800);
