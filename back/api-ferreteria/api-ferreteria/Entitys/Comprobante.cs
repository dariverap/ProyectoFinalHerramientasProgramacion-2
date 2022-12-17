using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Runtime.Serialization;

namespace api_ferreteria.Entitys
{
    public class Comprobante
    {

        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int numero { get; set; }
        [Required]
        [DataType(DataType.Date)]
        [Column(TypeName = "date")]
        public DateTime fecha { get; set; }
        [Required]
        [Column(TypeName = "decimal(20,2)")]
        public decimal igv { get; set; }
        [Required]
        [Column(TypeName = "decimal(20,2)")]
        public decimal subtotal { get; set; }
        [Required]
        [Column(TypeName = "decimal(20,2)")]
        public decimal total { get; set; }
        [Required]
        public bool estado { get; set; }
        [Required]
        public int ClienteId { get; set; }
        
        public int UsuarioId { get; set; }
        
        public int FormaPagoId { get; set; }
        
        public int DocumentoId { get; set; }

        public List<Detalle> detalle { get; set; }
    }
}
