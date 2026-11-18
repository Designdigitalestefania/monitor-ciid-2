CREATE TABLE IF NOT EXISTS audit_logs (id UUID PRIMARY KEY DEFAULT uuid_generate_v4(), tenant_id UUID NOT NULL REFERENCES tenants(id), actor_type VARCHAR(50) NOT NULL, actor_id VARCHAR(255) NOT NULL, action VARCHAR(100) NOT NULL, entity_type VARCHAR(100), entity_id UUID, details JSONB, created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP);
CREATE INDEX IF NOT EXISTS idx_audit_tenant ON audit_logs(tenant_id);
CREATE INDEX IF NOT EXISTS idx_audit_created ON audit_logs(created_at DESC);
