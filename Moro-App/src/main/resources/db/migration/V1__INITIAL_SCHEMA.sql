
CREATE SEQUENCE IF NOT EXISTS public.production_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

CREATE TABLE production (
                            id_production BIGINT PRIMARY KEY NOT NULL,
                            quantity_plots INTEGER not null,
                            expected_production DOUBLE PRECISION,
                            lost_production DOUBLE PRECISION,
                            real_production DOUBLE PRECISION,
                            date_simulation DATE DEFAULT CURRENT_DATE,
                            spring_type INTEGER not null,
                            invert BOOLEAN DEFAULT false,
                            quantity_affected_plots INTEGER not null
);

ALTER TABLE public.production ALTER COLUMN id_production SET DEFAULT nextval('production_id_seq');
ALTER SEQUENCE public.production_id_seq OWNED BY public.production.id_production;