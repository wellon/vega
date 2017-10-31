namespace vega.Models.DTO
{
    public class ModelDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public MakeDto MakeDto { get; set; }
        public int MakeId { get; set; }
    }
}